import type React from "react"
interface TimeframeSelectorProps {
  value: "name" | "price" | "24hChange"
  onChange: (value: "name" | "price" | "24hChange" ) => void
}

export function NavSelector({ value, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex bg-[#212429] rounded-lg p-1 w-[280px] m-auto">
      <TimeframeButton active={value === "name"} onClick={() => onChange("name")}>
        name
      </TimeframeButton>
      <TimeframeButton active={value === "price"} onClick={() => onChange("price")}>
        price
      </TimeframeButton>
      <TimeframeButton active={value === "24hChange"} onClick={() => onChange("24hChange")}>
        24hChange
      </TimeframeButton>
    </div>
  )
}

interface TimeframeButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function TimeframeButton({ active, onClick, children }: TimeframeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 text-xs font-medium rounded-md ${
        active ? "bg-[dodgerblue] text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}