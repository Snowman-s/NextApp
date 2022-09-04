import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  PlayArrow,
  Pause,
  FastForward,
  SkipNext,
  ArrowDownward,
  ArrowUpward,
} from "@material-ui/icons";
import {
  Converter,
  ITransformHierarchy,
  SystemConfigration,
  SystemInput,
  SystemTuple,
  TagSystem,
  TransformLogTable,
  TransformLogTableElm,
  TuringMachine,
} from "computation-system";

import Editor from "react-simple-code-editor";
import { defaultTagSystemCode, tagSystemAndInputBuilder } from "./tag-system";

export const SystemTrans = ["2-TagSystem to TM"] as const;
export type SystemTrans = typeof SystemTrans[number];

export type SystemTransTable = {
  "2-TagSystem to TM": [[TagSystem, TuringMachine]];
};

export function createHierarchy<T extends SystemTrans>(
  trans: T
): ITransformHierarchy<SystemTransTable[T][0]> {
  switch (trans) {
    case "2-TagSystem to TM":
      return Converter.tag2SystemToTuringMachine218New();
  }
}

export function toJSX<T extends SystemTrans>(
  trans: T,
  hierarchy: ITransformHierarchy<SystemTransTable[T][0]>,
  proceedButtonArgs: ProceedButtonArgs,
  skipButtonArgs: SkipButtonArgs
): JSX.Element {
  switch (trans) {
    case "2-TagSystem to TM":
      return tag2SystemToTM(hierarchy, proceedButtonArgs, skipButtonArgs);
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
  return (
    <>
      {props.onSkipUntilInterpretable !== undefined ? (
        <IconButton
          onClick={() => props.onSkipUntilInterpretable(props.system)}
        >
          <SkipNext />
        </IconButton>
      ) : (
        <></>
      )}
    </>
  );
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
    system: SystemTransTable[T][0][0],
    input: SystemInput<SystemTransTable[T][0][0]>
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
  input: ITransformHierarchy<[TagSystem, TuringMachine]>,
  proceedButtonArgs: ProceedButtonArgs,
  skipButtonArgs: SkipButtonArgs
): JSX.Element {
  let mapper = function mapper(
    elm: TransformLogTableElm[] | TransformLogTableElm
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

  let transformTableColumns: GridColDef[] = [
    {
      field: "input",
      valueGetter: (params) => mapper(params.row[0]),
      width: 100,
    },
    {
      field: "output",
      valueGetter: (params) => mapper(params.row[1]),
      width: 150,
    },
    {
      field: "This Letter's Representation",
      valueGetter: (params) => mapper(params.row[3]),
      width: 200,
    },
    {
      field: "Output's Representation",
      valueGetter: (params) => mapper(params.row[4]),
      width: 200,
    },
  ];

  return (
    <>
      {tagSystemToJSX(
        input.getTuple(0),
        input.getConfiguration(0),
        undefined,
        Object.assign(skipButtonArgs, { system: 0 })
      )}
      <Grid container>
        <Grid item>
          <ArrowUpward />
        </Grid>
        {(function () {
          let table = input.getTransFormLogTable(0);
          if (table !== null) {
            return (
              <Grid item>
                <div style={{ height: 400, width: 700 }}>
                  <DataGrid
                    rows={table}
                    columns={transformTableColumns}
                    getRowId={(elm) => {
                      return table.findIndex((e) => e === elm);
                    }}
                  ></DataGrid>
                </div>
              </Grid>
            );
          } else {
            return <></>;
          }
        })()}
      </Grid>
      {turingMachineToJSX(
        input.getTuple(1),
        input.getConfiguration(1),
        proceedButtonArgs
      )}
    </>
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
        }
      })}
    </Card>
  );
}
