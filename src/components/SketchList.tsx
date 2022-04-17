import {
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

export class SketchListProps {
  sketches: { sketchName: string; sketchURL: string; sketchImage: string }[];
}

export function SketchList(props: SketchListProps) {
  const router = useRouter();

  return (
    <List subheader={<ListSubheader>スケッチのリスト</ListSubheader>}>
      {props.sketches.map((sketchInfo) => {
        return (
          <ListItem
            key={sketchInfo.sketchURL}
            button
            onClick={(event) => {
              event.preventDefault();
              router.push(sketchInfo.sketchURL);
            }}
          >
            {sketchInfo.sketchName}
          </ListItem>
        );
      })}
    </List>
  );
}
