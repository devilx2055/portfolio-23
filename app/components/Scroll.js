import LocomotiveScroll from "locomotive-scroll";

export default function Scroll(wrapper) {
  const locomotive = new LocomotiveScroll({
    el: wrapper,
    smooth: true,
  });

  return locomotive;
}
