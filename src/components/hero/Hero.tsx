import { Intro } from "./Intro";
import { Portrait } from "./Portrait";

export function Hero() {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className="order-2 md:order-1">
        <Intro />
      </div>
      <div className="order-1 md:order-2">
        <Portrait />
      </div>
    </div>
  );
}
