import * as THREE from 'three';

// Procedurally generates photorealistic PBR textures for gym hardware
export class GymTextureGenerator {
  // 1. Olympic Barbell Diamond Knurling Bump/Normal Map
  public static createKnurlingTexture(): THREE.CanvasTexture {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Base neutral height
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, size, size);

      // Create diagonal diamond pyramid crosshatching
      const spacing = 16;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;

      // Diagonal line pass 1
      for (let x = -size; x < size * 2; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + size, size);
        ctx.stroke();
      }

      // Diagonal line pass 2
      for (let x = -size; x < size * 2; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, size);
        ctx.lineTo(x + size, 0);
        ctx.stroke();
      }

      // Diamond center points for high specular peaks
      ctx.fillStyle = '#ffffff';
      for (let y = 0; y < size; y += spacing) {
        for (let x = 0; x < size; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 4);
    return texture;
  }

  // 2. Brushed Steel Anisotropic Texture
  public static createBrushedSteelTexture(): THREE.CanvasTexture {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#cccccc';
      ctx.fillRect(0, 0, size, size);

      // Fine horizontal streaks
      for (let i = 0; i < 1500; i++) {
        const y = Math.random() * size;
        const alpha = Math.random() * 0.15 + 0.02;
        const color = Math.random() > 0.5 ? 255 : 80;
        ctx.strokeStyle = `rgba(${color}, ${color}, ${color}, ${alpha})`;
        ctx.lineWidth = Math.random() * 1.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 8);
    return texture;
  }

  // 3. Plate Face Decal with Laser-Etched Typography
  public static createPlateFaceTexture(weightText = '20 KG'): THREE.CanvasTexture {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Matte dark vulcanized rubber background
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, size, size);

      // Outer groove ring
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
      ctx.stroke();

      // Lime accent inner ring
      ctx.strokeStyle = '#C6FF00';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
      ctx.stroke();

      // Top text: "IRON CITY GYM"
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Curved or positioned lettering
      ctx.fillText('IRON CITY GYM', 0, -size * 0.28);

      // Center Weight Text
      ctx.font = 'bold 96px Arial, sans-serif';
      ctx.fillStyle = '#C6FF00';
      ctx.fillText(weightText, 0, 0);

      // Bottom Subtext: "CALIBRATED ±10G • OLYMPIC SPEC"
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.fillStyle = '#888888';
      ctx.fillText('CALIBRATED ±10G • IPF SPEC', 0, size * 0.28);

      ctx.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }
}
