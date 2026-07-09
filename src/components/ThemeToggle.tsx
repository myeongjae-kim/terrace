import { Button } from "@astryxdesign/core/Button";
import { useAstryxTheme } from "./AstryxProvider";

const labels = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

export default function ThemeToggle() {
  const { mode, setMode } = useAstryxTheme();

  function toggleMode() {
    setMode(mode === "light" ? "dark" : mode === "dark" ? "system" : "light");
  }

  return (
    <Button
      label={`Theme: ${labels[mode]}`}
      variant="ghost"
      size="sm"
      onClick={toggleMode}
      tooltip="Switch color mode"
    />
  );
}
