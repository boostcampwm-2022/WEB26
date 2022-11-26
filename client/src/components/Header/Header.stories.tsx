import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

export default {
    title: "Example/Header",
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
    <MemoryRouter>
        <Header {...args} />
    </MemoryRouter>
);
export const Login = Template.bind({});
Login.args = {
    text: "코스 목록",
};
export const Logout = Template.bind({});
Logout.args = {
    text: "코스 목록",
};
