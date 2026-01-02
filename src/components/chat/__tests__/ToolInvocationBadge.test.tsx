import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

test("shows 'Creating' message for str_replace_editor create command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "create", path: "components/Button.tsx" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("shows 'Editing' message for str_replace_editor str_replace command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "str_replace", path: "App.jsx" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("shows 'Editing' message for str_replace_editor insert command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "insert", path: "src/utils/helpers.ts" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Editing helpers.ts")).toBeDefined();
});

test("shows 'Viewing' message for str_replace_editor view command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "view", path: "config.json" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Viewing config.json")).toBeDefined();
});

test("shows 'Deleting' message for file_manager delete command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "file_manager",
        state: "result",
        args: { command: "delete", path: "old-file.js" },
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Deleting old-file.js")).toBeDefined();
});

test("shows 'Renaming' message for file_manager rename command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "file_manager",
        state: "result",
        args: {
          command: "rename",
          path: "OldName.tsx",
          new_path: "NewName.tsx",
        },
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Renaming OldName.tsx to NewName.tsx")).toBeDefined();
});

test("shows loading spinner when tool is pending", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "pending",
        args: { command: "create", path: "Loading.tsx" },
      }}
    />
  );

  expect(screen.getByText("Creating Loading.tsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).not.toBeNull();
});

test("shows green indicator when tool is complete", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "create", path: "Complete.tsx" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating Complete.tsx")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).not.toBeNull();
});

test("falls back to tool name for unknown tools", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "unknown_tool",
        state: "result",
        args: {},
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("unknown_tool")).toBeDefined();
});

test("handles missing path gracefully", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "create" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating file")).toBeDefined();
});

test("extracts filename from nested path", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "create", path: "src/components/ui/Dialog.tsx" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating Dialog.tsx")).toBeDefined();
});

test("shows 'Modifying' for unknown str_replace_editor command", () => {
  render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        state: "result",
        args: { command: "unknown_command", path: "file.ts" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Modifying file.ts")).toBeDefined();
});
