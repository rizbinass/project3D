import { readFileSync } from "fs";

const file = process.argv[2] || "public/assets/models/room2.glb";
const buf = readFileSync(file);

const magic = buf.readUInt32LE(0);
if (magic !== 0x46546C67) {
  console.error("Not a GLB file");
  process.exit(1);
}

const jsonChunkLength = buf.readUInt32LE(12);
const jsonChunkData = buf.subarray(20, 20 + jsonChunkLength).toString("utf-8");
const gltf = JSON.parse(jsonChunkData);

const bufferView = (idx) => gltf.bufferViews[idx];
const componentSize = (type) => {
  const map = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };
  return map[type] || 4;
};
const componentCount = (type) => ({ SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[type] || 1);

const readAccessor = (accessorIdx) => {
  const acc = gltf.accessors[accessorIdx];
  const bv = bufferView(acc.bufferView);
  const stride = (bv.byteStride || componentSize(acc.componentType) * componentCount(acc.type));
  const start = 20 + (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const count = acc.count;
  const values = [];
  for (let i = 0; i < count; i++) {
    const offset = start + i * stride;
    const x = buf.readFloatLE(offset);
    const y = buf.readFloatLE(offset + 4);
    const z = buf.readFloatLE(offset + 8);
    values.push([x, y, z]);
  }
  return values;
};

// Scan meshes
const nodes = gltf.nodes || [];
const meshes = gltf.meshes || [];

console.log("\n=== MESHES ===\n");
const meshData = [];

for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];
  const name = node.name || `node_${i}`;
  if (node.mesh == null) continue;
  const mesh = meshes[node.mesh];
  if (!mesh) continue;

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (const prim of mesh.primitives) {
    if (prim.attributes.POSITION == null) continue;
    const positions = readAccessor(prim.attributes.POSITION);
    for (const [x, y, z] of positions) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }
  }

  if (minX === Infinity) continue;

  const sizeX = maxX - minX;
  const sizeY = maxY - minY;
  const sizeZ = maxZ - minZ;

  meshData.push({ name, size: [sizeX.toFixed(3), sizeY.toFixed(3), sizeZ.toFixed(3)] });
}

meshData.sort((a, b) => a.name.localeCompare(b.name));

console.log("Mesh Name".padEnd(30), "Size X".padEnd(10), "Size Y".padEnd(10), "Size Z".padEnd(10), "FLAT?");
console.log("-".repeat(80));

for (const m of meshData) {
  const [x, y, z] = m.size;
  const flat = parseFloat(z) < 0.01 || parseFloat(x) < 0.01 || parseFloat(y) < 0.01;
  console.log(m.name.padEnd(30), x.padEnd(10), y.padEnd(10), z.padEnd(10), flat ? "⚠ FLAT" : "");
}

// Scan lights
console.log("\n=== LIGHTS ===\n");

const lightDefs = gltf.extensionsUsed?.KHR_lights_punctual
  ? gltf.extensions?.KHR_lights_punctual
  : null;

if (lightDefs && lightDefs.lights) {
  console.log("Light Name".padEnd(30), "Type".padEnd(15), "Color".padEnd(20), "Intensity");
  console.log("-".repeat(85));
  for (const light of lightDefs.lights) {
    console.log(
      (light.name || "unnamed").padEnd(30),
      (light.type || "?").padEnd(15),
      (light.color ? `[${light.color.join(", ")}]` : "?").padEnd(20),
      light.intensity ?? "?"
    );
  }
} else {
  console.log("No KHR_lights_punctual extension found in GLB.");
}

// Scan nodes with light references
console.log("\n=== NODES WITH LIGHTS ===\n");
for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];
  const name = node.name || `node_${i}`;
  const ext = node.extensions?.KHR_lights_punctual;
  if (ext) {
    console.log(`Node: ${name} → light index: ${ext.light}`);
    if (node.translation) console.log(`  Position: [${node.translation.join(", ")}]`);
    if (node.rotation) console.log(`  Rotation: [${node.rotation.join(", ")}]`);
    if (node.scale) console.log(`  Scale: [${node.scale.join(", ")}]`);
  }
}
