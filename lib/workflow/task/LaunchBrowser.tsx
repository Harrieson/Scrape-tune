import { TaskParamType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "LauncH Browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-pink-400" {...props} />
    ),
    isEntryPoint: true,
    inputs: [
        {
            name: "Website URL",
            type: TaskParamType.STRING,
            helperText: "eg https://google.com",
            required: true,
            hidehandle: true
        }
    ]
}