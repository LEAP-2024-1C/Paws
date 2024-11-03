import { type FC } from "react";
import { Transition } from "react-transition-group";
import ReportForm from "./report_form";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

type Props = {
  isShowing: boolean;
  onClose: () => void;
};

gsap.registerPlugin(useGSAP);

const SideMenu: FC<Props> = ({ isShowing, onClose }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    gsap
      .timeline()
      .to(".backdrop", { opacity: 1, duration: 0.5 })
      .fromTo(
        ".content",
        { opacity: 0, xPercent: 100 },
        { opacity: 1, xPercent: 0, duration: 0.3 },
        0
      )
      .fromTo(
        "h2,p",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.3 },
        "-=0.2"
      );
  });

  const onExit = contextSafe(() => {
    gsap.to(".backdrop", { opacity: 0, duration: 0.2 });
    gsap.to(".content", { opacity: 0, xPercent: 100, duration: 0.2 });
  });

  return (
    <Transition
      in={isShowing}
      timeout={{ enter: 0, exit: 300 }}
      mountOnEnter
      unmountOnExit
      onEnter={onEnter}
      onExit={onExit}
      nodeRef={container}
    >
      <div
        ref={container}
        className="fixed inset-0 z-50 flex items-center justify-end"
      >
        <div
          className="absolute inset-0 cursor-pointer bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="content absolute right-0 top-0 h-full w-[400px] bg-gradient-to-b from-zinc-900 to-black border-zinc-800 p-6 text-white shadow-2xl border-l overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 pb-4 mb-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-center text-green-500">
                Emergency Assistance
              </h2>
            </div>

            <ReportForm onSubmit={() => {}} />
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default SideMenu;
