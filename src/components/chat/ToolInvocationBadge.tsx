"use client";

import { Loader2, FileIcon, FilePenIcon, Trash2Icon, ArrowRightIcon } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  state: string;
  args?: Record<string, unknown>;
  result?: unknown;
}

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

function getFileName(path: string): string {
  return path.split("/").pop() || path;
}

function getToolMessage(toolInvocation: ToolInvocation): {
  message: string;
  icon: React.ReactNode;
} {
  const { toolName, args } = toolInvocation;
  const path = args?.path as string | undefined;
  const fileName = path ? getFileName(path) : "file";
  const command = args?.command as string | undefined;

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return {
          message: `Creating ${fileName}`,
          icon: <FileIcon className="w-3 h-3" />,
        };
      case "str_replace":
      case "insert":
        return {
          message: `Editing ${fileName}`,
          icon: <FilePenIcon className="w-3 h-3" />,
        };
      case "view":
        return {
          message: `Viewing ${fileName}`,
          icon: <FileIcon className="w-3 h-3" />,
        };
      default:
        return {
          message: `Modifying ${fileName}`,
          icon: <FilePenIcon className="w-3 h-3" />,
        };
    }
  }

  if (toolName === "file_manager") {
    const newPath = args?.new_path as string | undefined;
    switch (command) {
      case "rename":
        const newFileName = newPath ? getFileName(newPath) : "file";
        return {
          message: `Renaming ${fileName} to ${newFileName}`,
          icon: <ArrowRightIcon className="w-3 h-3" />,
        };
      case "delete":
        return {
          message: `Deleting ${fileName}`,
          icon: <Trash2Icon className="w-3 h-3" />,
        };
      default:
        return {
          message: `Managing ${fileName}`,
          icon: <FileIcon className="w-3 h-3" />,
        };
    }
  }

  return {
    message: toolName,
    icon: <FileIcon className="w-3 h-3" />,
  };
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const isComplete = toolInvocation.state === "result" && toolInvocation.result;
  const { message, icon } = getToolMessage(toolInvocation);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isComplete ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-neutral-600">{icon}</span>
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-neutral-600">{icon}</span>
          <span className="text-neutral-700">{message}</span>
        </>
      )}
    </div>
  );
}
