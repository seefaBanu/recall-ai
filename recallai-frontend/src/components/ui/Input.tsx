export default function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary-400"
    />
  );
}
