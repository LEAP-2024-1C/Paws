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
          className="absolute inset-0 cursor-pointer backdrop-blur-[2px]"
          onClick={onClose}
        >
          <div
            className="content absolute right-0 top-0 h-full w-[400px] bg-gradient-to-b from-zinc-200 to-zinc-250 text-white shadow-2xl  border-zinc-800/50 overflow-y-auto rounded-l-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-zinc-250/50 backdrop-blur-sm px-6 py-4 mb-4 border-zinc-800/50 rounded-tl-2xl"></div>
            <div className="px-6">
              <ReportForm onSubmit={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default SideMenu;
