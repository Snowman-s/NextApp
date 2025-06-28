import {
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import FastForward from "@mui/icons-material/FastForward";
import SkipNext from "@mui/icons-material/SkipNext";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import {
  Converter,
  createHierarchy,
  ITransformHierarchy,
  SystemConfigration,
  SystemInput,
  SystemTuple,
  Tag2SystemToTuringMachine218TransformLog,
  TagSystem,
  TuringMachine,
} from "computation-system";

import Editor from "react-simple-code-editor";
import { defaultTagSystemCode, tagSystemAndInputBuilder } from "./tag-system";
import { JSX } from "react";

export const SystemTrans = ["2-TagSystem to TM"] as const;
export type SystemTrans = typeof SystemTrans[number];

export type SystemTransTable = {
  "2-TagSystem to TM": { "systemFlow": [TagSystem, TuringMachine], "log": [Tag2SystemToTuringMachine218TransformLog] };
};

export function createHierarchyFromTrans<T extends SystemTrans>(
  trans: T
): ITransformHierarchy<SystemTransTable[T]["systemFlow"], [Tag2SystemToTuringMachine218TransformLog]> {
  switch (trans) {
    case "2-TagSystem to TM":
      return createHierarchy(Converter.tag2SystemToTuringMachine218());
  }
}

export function toJSX<T extends SystemTrans>(
  trans: T,
  hierarchy: ITransformHierarchy<SystemTransTable[T]["systemFlow"], unknown[]>,
  proceedButtonArgs: ProceedButtonArgs,
  skipButtonArgs: SkipButtonArgs
): JSX.Element {
  switch (trans) {
    case "2-TagSystem to TM":
      return tag2SystemToTM(hierarchy as ITransformHierarchy<[TagSystem, TuringMachine], [Tag2SystemToTuringMachine218TransformLog]>, proceedButtonArgs, skipButtonArgs);
  }
}

export type ProceedButtonArgs = {
  onStart?: () => void;
  onProceed?: () => void;
  onStop?: () => void;
  isStarted: boolean;
};

export type SkipButtonArgs = {
  onSkipUntilInterpretable?: (system: number) => void;
};

function ProceedButton(props: ProceedButtonArgs) {
  return (
    <>
      {props.onStart !== undefined ? (
        props.isStarted ? (
          <IconButton onClick={props.onStop}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton onClick={props.onStart}>
            <FastForward />
          </IconButton>
        )
      ) : (
        <></>
      )}
      {props.onProceed !== undefined ? (
        <IconButton onClick={props.onProceed}>
          <PlayArrow />
        </IconButton>
      ) : (
        <></>
      )}
    </>
  );
}

function SkipButton(props: SkipButtonArgs & { system: number }) {
  const onSkipUntilInterpretable = props.onSkipUntilInterpretable;
  if (onSkipUntilInterpretable === undefined) {
    return <></>;
  } else {
    return (
      <IconButton
        onClick={() => onSkipUntilInterpretable(props.system)}
      >
        <SkipNext />
      </IconButton>
    );
  }
}

function CompileButton(onClick: () => void) {
  return <Button onClick={onClick}>Compile And Reload</Button>;
}

export function toSystemCreateJSX<T extends SystemTrans>(
  trans: T,
  nowCode: string,
  setCode: (code: string) => void,
  error: string,
  setError: (error: string) => void,
  setSystemAndInput: (
    system: SystemTransTable[T]["systemFlow"][0],
    input: SystemInput<SystemTransTable[T]["systemFlow"][0]>
  ) => void
): JSX.Element {
  switch (trans) {
    case "2-TagSystem to TM":
      return tagSystemCreateJSX(
        nowCode,
        setCode,
        error,
        setError,
        setSystemAndInput
      );
  }
}

export function getDefaultCode(trans: SystemTrans) {
  switch (trans) {
    case "2-TagSystem to TM":
      return defaultTagSystemCode;
  }
}

function tag2SystemToTM(
  input: ITransformHierarchy<[TagSystem, TuringMachine], [Tag2SystemToTuringMachine218TransformLog]>,
  proceedButtonArgs: ProceedButtonArgs,
  skipButtonArgs: SkipButtonArgs
): JSX.Element {
  let mapper = function mapper(
    elm: any
  ): string {
    if (Array.isArray(elm)) {
      return elm.map((e) => mapper(e)).reduce((a, b) => a + b, "");
    } else if (
      (typeof elm !== "object" && typeof elm !== "function") ||
      elm === null
    ) {
      return elm.toString();
    } else if ("value" in elm) {
      return (elm as { value: string }).value;
    } else {
      return elm.toString();
    }
  };

  const transformLogTable =
    (<TableContainer component={Paper} style={{ width: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ルール番号</TableCell>
            <TableCell>ルール(タグシステム)</TableCell>
            <TableCell>入力文字表現 (TM)</TableCell>
            <TableCell>出力表現 (TM)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {input.getTransFormLogOf(0)?.transformTable.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{mapper(row.N)}</TableCell>
              <TableCell>{mapper(row.letter) + " ⇒ " + mapper(row.output)}</TableCell>
              <TableCell>{mapper(row.charRepresent)}</TableCell>
              <TableCell>{mapper(row.outRepresent)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start">
      {tagSystemToJSX(
        input.getTuple(0)!,
        input.getConfiguration(0)!,
        undefined,
        Object.assign(skipButtonArgs, { system: 0 })
      )}
      <ArrowUpward />
      {(function () {
        let table = input.getTransFormLogOf(0)?.transformTable!;
        if (table !== null) {
          return (
            transformLogTable
          );
        } else {
          return <></>;
        }
      })()}
      {turingMachineToJSX(
        input.getTuple(1)!,
        input.getConfiguration(1)!,
        proceedButtonArgs
      )}
    </Stack>
  );
}

function tagSystemToJSX(
  tuple: SystemTuple<TagSystem>,
  config: SystemConfigration<TagSystem>,
  proceedButtonArgs?: ProceedButtonArgs,
  skipButtonArgs?: SkipButtonArgs & { system: number }
) {
  const tupleInfo =
    tuple === null ? (
      <></>
    ) : (
      <Typography>{tuple.ruleSet.toString()}</Typography>
    );
  const configInfo = (
    <Typography>
      {config === null ? "??????" : config.word.toString()}
    </Typography>
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {tuple === null ? "" : tuple.deleteNum + "-"}Tag System
        </Typography>
        {skipButtonArgs === undefined ? <></> : SkipButton(skipButtonArgs)}
        {proceedButtonArgs === undefined ? (
          <></>
        ) : (
          ProceedButton(proceedButtonArgs)
        )}
        {tupleInfo}
        {configInfo}
      </CardContent>
    </Card>
  );
}

function turingMachineToJSX(
  tuple: SystemTuple<TuringMachine>,
  config: SystemConfigration<TuringMachine>,
  proceedButtonArgs?: ProceedButtonArgs,
  skipButtonArgs?: SkipButtonArgs & { system: number }
) {
  const tupleInfo =
    tuple === null ? (
      <></>
    ) : (
      <>
        <Typography>
          {"InitState:" +
            tuple.initState.value +
            ", Accept:" +
            tuple.acceptState}
        </Typography>
        <Typography>{tuple.ruleset.toString()}</Typography>
      </>
    );

  const configInfo =
    config === null ? (
      <></>
    ) : (
      (function () {
        return (
          <Typography>
            {config.nowState.value}{" "}
            {[...config.tape.toString()].map((str) => (
              <>
                <wbr />
                {str}
              </>
            ))}
          </Typography>
        );
      })()
    );

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>Turing Machine</Typography>
        {proceedButtonArgs === undefined ? (
          <></>
        ) : (
          ProceedButton(proceedButtonArgs)
        )}
        {skipButtonArgs === undefined ? <></> : SkipButton(skipButtonArgs)}
        {tupleInfo}
        <hr />
        {configInfo}
      </CardContent>
    </Card>
  );
}

function tagSystemCreateJSX(
  nowCode: string,
  setCode: (code: string) => void,
  error: string,
  setError: (error: string) => void,
  setSystemAndInput: (system: TagSystem, input: SystemInput<TagSystem>) => void
): JSX.Element {
  return (
    <Card variant="outlined">
      <Typography>TagSystem Input Settings</Typography>
      <Editor
        value={nowCode}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => <div>{code}</div>}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          fontWeight: "bold",
        }}
      />
      <Typography>{error === "" ? "" : "!COMPILE ERROR! " + error}</Typography>
      {CompileButton(() => {
        try {
          setSystemAndInput(...tagSystemAndInputBuilder(nowCode));
          setError("");
        } catch (e) {
          setError((e as Error).message);
          throw e;
        }
      })}
    </Card>
  );
}
