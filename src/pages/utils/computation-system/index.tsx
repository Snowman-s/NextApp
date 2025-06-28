import { Button, MenuItem, Paper, Select } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  ITransformHierarchy,
  SystemInput,
  TagSystem,
  TagSystemLetter,
} from "computation-system";
import { useState } from "react";
import {
  createHierarchyFromTrans,
  getDefaultCode,
  SystemTrans,
  SystemTransTable,
  toJSX,
  toSystemCreateJSX,
} from "src/others/computation-system/converter";
import CustomBar from "src/components/CustomBar";

type HierarchyAndValidTrans<T extends SystemTrans> = {
  trans: T,
  hierarchy: ITransformHierarchy<SystemTransTable[T]["systemFlow"], SystemTransTable[T]["log"]>,
  system: SystemTransTable[T]["systemFlow"][0] | null,
  input: SystemInput<SystemTransTable[T]["systemFlow"][0]> | null
};

export default function Home() {
  const [hierarchyAndValidTrans, setHierarchyAndValidTrans] =
    useState<HierarchyAndValidTrans<SystemTrans> | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [trans, setTrans] = useState<SystemTrans>("2-TagSystem to TM");
  const [proceedTimer, setProceedTimer] = useState<NodeJS.Timeout | null>(null);
  const [isStarted, setStarted] = useState(false);

  return (
    <>
      <CustomBar />
      <div style={{ padding: "10px" }}>
        <Select
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
            setHierarchyAndValidTrans({
              trans,
              hierarchy: createHierarchyFromTrans(trans),
              system: null,
              input: [[]],
            });
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
                hierarchyAndValidTrans.trans,
                code,
                setCode,
                error,
                setError,
                (system: TagSystem, input: [letters: TagSystemLetter[]]) => {
                  hierarchyAndValidTrans.hierarchy.start(system, input);
                  setStarted(true);
                  if (proceedTimer !== null) {
                    clearInterval(proceedTimer);
                    setProceedTimer(null);
                  }
                  setHierarchyAndValidTrans({
                    ...hierarchyAndValidTrans,
                    system,
                    input,
                  });
                }
              )}
            </Paper>
            <KeyboardArrowDown />
            <Paper style={{ padding: 10 }}>
              {toJSX(
                hierarchyAndValidTrans.trans,
                hierarchyAndValidTrans.hierarchy,
                {
                  onStart: isStarted
                    ? () => {
                      setProceedTimer(
                        setInterval(() => {
                          hierarchyAndValidTrans.hierarchy.proceed(1);
                          setHierarchyAndValidTrans({
                            ...hierarchyAndValidTrans,
                          });
                        }, 100)
                      );
                    }
                    : undefined,
                  isStarted: proceedTimer !== null,
                  onProceed: isStarted
                    ? () => {
                      hierarchyAndValidTrans.hierarchy.proceed(1);
                      setHierarchyAndValidTrans({ ...hierarchyAndValidTrans });
                      if (proceedTimer !== null) {
                        clearInterval(proceedTimer);
                        setProceedTimer(null);
                      }
                      setProceedTimer(null);
                    }
                    : undefined,
                  onStop() {
                    if (proceedTimer !== null) {
                      clearInterval(proceedTimer);
                      setProceedTimer(null);
                    }
                    setProceedTimer(null);
                  },
                },

                {
                  onSkipUntilInterpretable: isStarted
                    ? (system) => {
                      if (proceedTimer !== null) {
                        clearInterval(proceedTimer);
                        setProceedTimer(null);
                      }
                      setProceedTimer(null);
                      for (let i = 0; i < 30000; i++) {
                        hierarchyAndValidTrans.hierarchy.proceed(1);
                        if (
                          hierarchyAndValidTrans.hierarchy.getConfiguration(system) !==
                          null
                        ) {
                          break;
                        }
                      }
                      setHierarchyAndValidTrans({ ...hierarchyAndValidTrans });
                    }
                    : undefined,
                }
              )}
            </Paper>
          </>
        )}
      </div>
    </>
  );
}
