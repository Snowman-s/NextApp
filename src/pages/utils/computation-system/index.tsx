import { Button, MenuItem, Paper, Select } from "@material-ui/core";
import {
  ArrowDownward,
  CloudDownload,
  FontDownload,
  KeyboardArrowDown,
} from "@material-ui/icons";
import {
  ITransformHierarchy,
  SystemInput,
  TagSystem,
  TagSystemLetter,
} from "computation-system";
import { useState } from "react";
import {
  createHierarchy,
  getDefaultCode,
  SystemTrans,
  SystemTransTable,
  toJSX,
  toSystemCreateJSX,
} from "src/others/computation-system/converter";

type HierarchyAndValidTrans<T extends SystemTrans> = [
  T,
  ITransformHierarchy<SystemTransTable[T][0]>,
  SystemTransTable[T][0][0] | null,
  SystemInput<SystemTransTable[T][0][0]> | null
];

export default function Home() {
  const [hierarchyAndValidTrans, setHierarchyAndValidTrans] =
    useState<HierarchyAndValidTrans<SystemTrans> | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [trans, setTrans] = useState<SystemTrans>("2-TagSystem to TM");
  const [proceedTimer, setProceedTimer] = useState<NodeJS.Timer | null>(null);
  const [isStarted, setStarted] = useState(false);

  return (
    <>
      <Select
        label="Select simulator..."
        value={trans}
        onChange={(event) => {
          setTrans(event.target.value as SystemTrans);
        }}
      >
        {SystemTrans.map((str) => (
          <MenuItem key={str} value={str}>
            {str}
          </MenuItem>
        ))}
      </Select>
      <Button
        onClick={() => {
          setHierarchyAndValidTrans([
            trans,
            createHierarchy(trans),
            null,
            [[]],
          ]);
          setCode(getDefaultCode(trans));
        }}
      >
        Setup Simulator
      </Button>
      {hierarchyAndValidTrans === null ? (
        <></>
      ) : (
        <>
          <Paper>
            {toSystemCreateJSX(
              hierarchyAndValidTrans[0],
              code,
              setCode,
              error,
              setError,
              (system: TagSystem, input: [letters: TagSystemLetter[]]) => {
                hierarchyAndValidTrans[1].start(system, input);
                setStarted(true);
                clearInterval(proceedTimer);
                setProceedTimer(null);
                setHierarchyAndValidTrans([
                  hierarchyAndValidTrans[0],
                  hierarchyAndValidTrans[1],
                  system,
                  input,
                ]);
              }
            )}
          </Paper>
          <KeyboardArrowDown />
          <Paper>
            {toJSX(
              hierarchyAndValidTrans[0],
              hierarchyAndValidTrans[1],
              {
                onStart: isStarted
                  ? () => {
                      setProceedTimer(
                        setInterval(() => {
                          hierarchyAndValidTrans[1].proceed(1);
                          setHierarchyAndValidTrans([
                            ...hierarchyAndValidTrans,
                          ]);
                        }, 100)
                      );
                    }
                  : undefined,
                isStarted: proceedTimer !== null,
                onProceed: isStarted
                  ? () => {
                      hierarchyAndValidTrans[1].proceed(1);
                      setHierarchyAndValidTrans([...hierarchyAndValidTrans]);
                      clearInterval(proceedTimer);
                      setProceedTimer(null);
                    }
                  : undefined,
                onStop() {
                  clearInterval(proceedTimer);
                  setProceedTimer(null);
                },
              },

              {
                onSkipUntilInterpretable: isStarted
                  ? (system) => {
                      clearInterval(proceedTimer);
                      setProceedTimer(null);
                      for (let i = 0; i < 30000; i++) {
                        hierarchyAndValidTrans[1].proceed(1);
                        if (
                          hierarchyAndValidTrans[1].getConfiguration(system) !==
                          null
                        ) {
                          break;
                        }
                      }
                      setHierarchyAndValidTrans([...hierarchyAndValidTrans]);
                    }
                  : undefined,
              }
            )}
          </Paper>
        </>
      )}
    </>
  );
}
