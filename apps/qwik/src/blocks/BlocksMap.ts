import { Component } from "@builder.io/qwik";
import AccordionBlock from "~/blocks/core/AccordionBlock";
import Banner from "~/blocks/core/Banner";
import WelcomeBlock from "~/blocks/core/WelcomeBlock";

type BlocksMap = {
  [tenant: string]: {
    // ignore use of any because I don't find any other solution
    // types will be checked in the blocks themselves
    [blockType: string]: Component<any>;
  };
};

export const BlocksMap: BlocksMap = {
  core: {
    WelcomeBlock,
    AccordionBlock,
    Banner,
  },
};
