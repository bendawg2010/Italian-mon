// 1:1 square cut for social. Reuses the exact same Ad composition since
// every scene is built around AbsoluteFill — they self-center inside
// whatever canvas Remotion gives them.
import { Ad } from "./Ad";

export const AdSquare: React.FC = () => <Ad />;
