import * as THREE from "three";

export interface GLBDirectorConfig {
  targetScalePercentage: number; // e.g. 0.65 for 65% of viewport height
  rootMotionCancellation: boolean;
}

export class GLBDirector {
  private rootBone: THREE.Object3D | null = null;
  private localHeight: number = 1.0;
  private modelCenter: THREE.Vector3 = new THREE.Vector3();
  private scene: THREE.Group | null = null;

  constructor(scene: THREE.Group, config: GLBDirectorConfig) {
    this.scene = scene;
    this.analyzeModel(scene, config);
  }

  /**
   * Analyzes the GLB model's skeleton and geometry bounds
   */
  private analyzeModel(scene: THREE.Group, config: GLBDirectorConfig) {
    const box = new THREE.Box3();
    let hasMesh = false;

    scene.traverse((child) => {
      // 1. Mesh Bound Calculation
      if ((child as THREE.Mesh).isMesh) {
        if (!hasMesh) {
          box.setFromObject(child);
          hasMesh = true;
        } else {
          box.expandByObject(child);
        }
      }

      // 2. Root Bone Detection (for motion cancellation)
      if (config.rootMotionCancellation && child.type === "Bone") {
        const name = child.name.toLowerCase();
        if (
          name.includes("root") ||
          name.includes("pelvis") ||
          name.includes("bip") ||
          name.includes("hips")
        ) {
          this.rootBone = child;
        }
      }
    });

    // Fallback: If no explicit root bone, take the first bone
    if (config.rootMotionCancellation && !this.rootBone) {
      scene.traverse((child) => {
        if (child.type === "Bone" && !this.rootBone) {
          this.rootBone = child;
        }
      });
    }

    // 3. Center and normalize geometry bounds
    if (hasMesh) {
      box.getCenter(this.modelCenter);
      
      // Physically center the model scene relative to its local group
      scene.position.x = -this.modelCenter.x;
      scene.position.y = -this.modelCenter.y;
      scene.position.z = -this.modelCenter.z;

      const size = new THREE.Vector3();
      box.getSize(size);
      this.localHeight = Math.max(0.1, size.y);
    }
  }

  /**
   * Track bone translation and reset root motion (stops character from walking off-screen)
   */
  public trackAndCancelMotion() {
    if (this.rootBone) {
      this.rootBone.position.x = 0;
      this.rootBone.position.z = 0;
    }
  }

  /**
   * Calculates the viewport-normalized scale for the model
   */
  public getNormalizedScale(viewportHeight: number, scaleMultiplier: number, config: GLBDirectorConfig): number {
    const baseScale = (viewportHeight * config.targetScalePercentage) / this.localHeight;
    return baseScale * scaleMultiplier;
  }

  /**
   * Performs dynamic head/eye tracking based on mouse coordinate vectors
   */
  public getInteractiveTracking(
    mouse: { x: number; y: number },
    currentRotation: THREE.Euler,
    lerpFactor: number = 0.05
  ): { x: number; y: number } {
    const targetY = (mouse.x * Math.PI) / 6 - 0.2;
    const targetX = (mouse.y * Math.PI) / 8;

    return {
      x: THREE.MathUtils.lerp(currentRotation.x, targetX, lerpFactor),
      y: THREE.MathUtils.lerp(currentRotation.y, targetY, lerpFactor),
    };
  }
}
