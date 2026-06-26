declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          "ios-src"?: string;
          alt?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "camera-controls"?: boolean;
          "auto-rotate"?: boolean;
          exposure?: string | number;
          "shadow-intensity"?: string | number;
          "shadow-softness"?: string | number;
          "environment-image"?: string;
          "camera-orbit"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          "rotation-per-second"?: string;
          interactionVisible?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

export {}; // Ensure it is treated as a module 
