import struct, json

def read_glb(path):
    with open(path, 'rb') as f:
        magic, version, length = struct.unpack('<III', f.read(12))
        chunk_len, chunk_type = struct.unpack('<II', f.read(8))
        json_data = json.loads(f.read(chunk_len).decode('utf-8'))
        return json_data

data = read_glb('d:/TechbrahamandAbhikSir/TechBramhand/frontend/public/robot.glb')

anims = data.get('animations', [])
print(f'=== ANIMATIONS: {len(anims)} ===')
for a in anims:
    name = a.get('name', 'unnamed')
    channels = len(a.get('channels', []))
    print(f'  Name: {name}, Channels: {channels}')

skins = data.get('skins', [])
print(f'\n=== SKINS (ARMATURES): {len(skins)} ===')
for s in skins:
    joints = s.get('joints', [])
    sname = s.get('name', 'unnamed')
    print(f'  Name: {sname}, Joints/Bones: {len(joints)}')

nodes = data.get('nodes', [])
print(f'\n=== NODES: {len(nodes)} ===')
for i, n in enumerate(nodes):
    name = n.get('name', '')
    has_mesh = 'mesh' in n
    has_skin = 'skin' in n
    has_children = 'children' in n
    print(f'  [{i}] {name} | mesh:{has_mesh} skin:{has_skin} children:{has_children}')
