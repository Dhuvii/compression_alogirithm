import LzwAlgorithm from "./LzwAlgorithm";
import ShanoFanoAlgorithm from "./ShanoFanoAlgorithm";

function App() {
  return (
    <section className="w-full min-h-screen flex justify-center md:flex-row flex-col items-center gap-10 p-10">
      <LzwAlgorithm />
      <ShanoFanoAlgorithm />
    </section>
  );
}

export default App;
