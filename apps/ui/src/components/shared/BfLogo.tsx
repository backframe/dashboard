import logo from "@/assets/bf.png";

export function BfLogo({ size }: { size?: number }) {
  return (
    <div className="w-[300px]">
      <img src={logo} alt="digitalfarmer_logo" width={size ?? 280} />
    </div>
  );
}
