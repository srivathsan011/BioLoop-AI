import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Code2, 
  ChevronDown, 
  ChevronRight, 
  Terminal,
  Zap,
  Clock
} from 'lucide-react';
import { AgentTraceStep } from '../types/bioloop';

interface AgentReasoningTraceProps {
  steps: AgentTraceStep[];
}

export const AgentReasoningTrace: React.FC<AgentReasoningTraceProps> = ({ steps }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedStepId(expandedStepId === id ? null : id);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-white">
            Agent Execution & Tool Reasoning Trace
          </h3>
          <p className="text-xs text-slate-400">
            Multi-step tool calls, microclimate validation, and cooperative inventory routing
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          {steps.length} Steps Logged
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {steps.map((step, index) => {
          const isExpanded = expandedStepId === step.id;
          const hasTool = Boolean(step.toolName);

          return (
            <div key={step.id} className="relative flex items-start gap-3.5 group">
              {/* Step indicator node */}
              <div
                className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-transform ${
                  step.status === 'overridden'
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                    : step.status === 'warning'
                    ? 'bg-rose-500 text-white ring-4 ring-rose-500/20'
                    : 'bg-emerald-600 text-white ring-4 ring-emerald-500/20'
                }`}
              >
                {step.status === 'overridden' ? (
                  <Zap className="w-3.5 h-3.5 fill-current" />
                ) : step.status === 'warning' ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step content card */}
              <div className="flex-1 bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 hover:border-slate-700 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-slate-200">
                      {step.title}
                    </span>
                    {step.toolName && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                        Function Call: {step.toolName}
                      </span>
                    )}
                    {step.status === 'overridden' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Dynamic Weather Override
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    {step.durationMs && <span>{step.durationMs}ms</span>}
                    <span>{step.timestamp}</span>
                  </div>
                </div>

                {/* Agent Thought */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-2">
                  {step.thought}
                </p>

                {/* Tool Inputs & Outputs details */}
                {hasTool && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(step.id)}
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      <span>{isExpanded ? 'Hide Tool Execution Payload' : 'Inspect Tool Parameters & Returns'}</span>
                    </button>

                    {isExpanded && (
                      <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-2 overflow-x-auto">
                        {step.toolArguments && (
                          <div>
                            <span className="text-slate-400 text-[10px] block uppercase font-bold">
                              Arguments ({step.toolName}):
                            </span>
                            <pre className="text-emerald-400 mt-1 whitespace-pre-wrap">
                              {JSON.stringify(step.toolArguments, null, 2)}
                            </pre>
                          </div>
                        )}
                        {step.toolResult && (
                          <div className="pt-2 border-t border-slate-800">
                            <span className="text-slate-400 text-[10px] block uppercase font-bold">
                              Tool Return Value:
                            </span>
                            <pre className="text-cyan-400 mt-1 whitespace-pre-wrap">
                              {JSON.stringify(step.toolResult, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
