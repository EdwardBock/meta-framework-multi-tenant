import Welcome from "./Welcome.tsx";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta = {
    title: 'Components/Welcome',
    component: Welcome,
    tags: ['autodocs'],
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {}
