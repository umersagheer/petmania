export default async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T | undefined) => JSX.Element;
}) {
  try {
    const data = await promise;
    return children(data);
  } catch (error) {
    console.error("AWAIT_COMP Error:", error);
    return children(undefined);
  }
}
