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

const Modal: FC<Props> = ({ isShowing, onClose }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  const onEnter = contextSafe(() => {
    gsap
      .timeline()
      .to(".backdrop", { opacity: 1, duration: 0.5 })
      .fromTo(
        ".content",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3 },
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
    gsap.to(".content", { opacity: 0, scale: 0.95, duration: 0.2 });
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
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 cursor-pointer bg-black/20 backdrop-blur-md"
          onClick={onClose}
        >
          <div
            className="backdrop absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[fit-content] space-y-4 w-[320px] bg-off-black border-black p-8 text-white shadow-2xl rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="flex justify-center items-center font-bold  text-green-500">
              This is Emergency Modal
            </h2>

            <ReportForm onSubmit={() => {}} />
          </div>
          <p> </p>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
