import { List, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

export type SketchListProps = {
  sketches: { sketchName: string; sketchURL: string; sketchImage: string }[];
}

export function SketchList(props: SketchListProps) {
  const router = useRouter();

  return (
    <List subheader={<ListSubheader>スケッチのリスト</ListSubheader>}>
      {props.sketches.map((sketchInfo) => {
        return (
          <ListItemButton
            key={sketchInfo.sketchURL}
            onClick={() => {
              router.push(sketchInfo.sketchURL);
            }}
          >
            <Image width={64} height={64} src={sketchInfo.sketchImage} alt={sketchInfo.sketchName} />
            {sketchInfo.sketchName}
          </ListItemButton>
        );
      })}
    </List>
  );
}
