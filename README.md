# rugbyregs

## demo site
https://rugbyregs.web.app

## json format
Each competition is described by a JSON structure as defined below.
Competitions inherit from all parent nodes unless explicity overridded (e.g. with null),
multipe levels of inheritance are possible wr -> rfu/reg6 -> rfu/kent

Json files can be found in public/regs

```
interface Competition {
  // Competition name
  name: string;
  
  // List of extra competitions to load - these are loaded as siblings - i.e. not associated
  // useful for a region where you may wish to also reference national competitions "rfu/men"
  // corresponds to a path in /public/regs
  load?: string[];
  
  // Url of parent competition (added at processing time to the parent's children), eg. "rfu/reg6"
  parent?: string;
  
  // Level of match
  level?: number;
  
    // Level of referee appointment
  refLevel?: number;
  
  // Whether rolling subsitutes apply - not sure this is actually used
  rollingSubs?: boolean;
  
  // The number of replacements allowed in matchday squad (false = no limit)
  replacements?: number | string | false;
  
  // Whether player-off applies  in event of uncontested scrums
  playerOff?: false;
  
  // Allowed number of interchanges for rollingSubs (false = no limit)
  interchanges?: number | string | false;
  
  // Required number of front row in matchday squad (false = no requirement)
  // Where different limits apply depending on squad this can be specified in array format
  frontRow?: number | string | false | { squad: number, frontRow: number }[];
  
  // Notes
  notes?: string[];
    
  // Links to further reference
  url?: string | string[];
  
  // Children - can be nested
  children: Competition[];
  
}
```
