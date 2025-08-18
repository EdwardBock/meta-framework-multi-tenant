import { component$ } from "@builder.io/qwik";
import { BlocksMap } from "~/blocks/BlocksMap";

type Tenant = {
  slug: string;
};

export type Block = {
  blockType: string;
};

export type Context = {
  id: string | null;
};

type Props = {
  value: Block[];
  tenant: Tenant;
  context: Context;
};

export default component$<Props>((props) => {
  const tenant = props.tenant;
  return props.value.map((block, index) => {
    const BlockComponent =
      BlocksMap[tenant.slug]?.[block.blockType] ??
      BlocksMap?.core?.[block.blockType];

    if (!BlockComponent) {
      return (
        <NotFoundBlock
          key={`${block.blockType}-${index}`}
          blockType={block.blockType}
        />
      );
    }

    return <BlockComponent key={`${block.blockType}-${index}`} {...block} />;
  });
});

const NotFoundBlock = component$<{ blockType: string }>(({ blockType }) => {
  return <p>{blockType} not implemented yet!</p>;
});
