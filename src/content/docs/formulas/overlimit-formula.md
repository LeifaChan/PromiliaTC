---
title: 'Overdrive System and Overlimit Formulas'
description: 'Document by: Leifa. Thank you very much to 666bj and Mero for assistance figuring out the game’s formulas\!'
---

*This document is very WIP and values will be finalised upon the game’s release!*

## Overlimit DMG Formula

The full DMG formula for Overlimit DMG is as follows:

$$
\begin{aligned}
\text{Overlimit DMG} &= \text{RoundEven}\Big( \max\big(1, \text{Base DMG} \times \text{DEF Multiplier} \\
&\quad \times \text{Elemental DMG} \times \text{Generic DMG} \times \text{Overlimit Crit} \times \text{Mastery} \\
&\quad \times \text{Hit Location} \times \text{Level Pressure} \times \text{Restraint}\big) \Big) \\
\end{aligned}
$$

## Elemental Sigils

When characters or Kibo use specific skills, they can generate or consume Elemental Sigils. Sigils are a resource shared by the whole team and grant a buff both when active. Up to a maximum of 5 Sigils of each Element can be held at once, with repeated triggers past 5 refreshing their duration. If no Sigils of a specific Element are gained for a set period of time, they will naturally decay and disappear one by one. Each Element has its own Elemental Sigil with different effects:

| Sigil&nbsp;Type | Sigil&nbsp;Effect |
| --- | --- |
| Fire Sigil | Increases ATK by 0.5% per Sigil. |
| Water Sigil | Increases Generic DMG Bonus by 0.4% per Sigil. |
| Ice Sigil | Increases DEF Penetration by 0.3% per Sigil. |
| Wind Sigil | Increases Stardecree Charge Efficiency by 0.4% per Sigil. |
| Nature Sigil | Increases Overlimit Crit Rate by 0.2% per Sigil. |
| Earth Sigil | Increases Poise Break Efficiency by 0.6% per Sigil. |
| Lightning Sigil | Increases Crit Rate and Crit DMG by 0.2% and 0.4% respectively per Sigil. |
| Light Sigil | Deals 1.0% of the active character's ATK per Sigil as Light Overlimit DMG every 5s. |
| Dark Sigil | Increases Elemental DMG Bonus by 0.4% per Sigil. |

## Overdrive System and Overlimit DMG

When characters or Kibo consume Elemental Sigils, they trigger the Overdrive effect of that specific Element, dealing Overlimit DMG based on the triggering character's ATK and granting additional buffs. Each skill will specify how many Elemental Sigils it can consume, either requiring a minimum amount or consuming up to a maximum amount. 

$$
\begin{aligned}
\text{Base DMG} &= 40.0\% \times \text{Sigils Consumed} \times \text{ATK} \\
\end{aligned}
$$

| Overdrive&nbsp;Type | Required&nbsp;Sigil | Overdrive&nbsp;Effect |
| --- | --- | --- |
| BLAST | Fire Sigil | Deals Fire Overlimit DMG and deals additional Fire Overlimit DMG equal to 10.0% of the triggering character's ATK per Sigil consumed per second for 6s.|
| DROWN | Water Sigil | Deals Water Overlimit DMG and reduces the target's DEF by 0.5% per Sigil consumed for 15s. |
| FREEZE | Ice Sigil | Deals Ice Overlimit DMG and freezes the target for 0.5s per Sigil consumed. This effect has no ICD. |
| CYCLONE | Wind Sigil | Deals Wind Overlimit DMG and grants 0.3 Stardecree Charge per Sigil consumed to the active character. |
| BLOOM | Nature Sigil | Deals Nature Overlimit DMG and increases the team's Overlimit Strength by 0.6% per Sigil consumed for 15s. |
| EXCESS | Earth Sigil | Deals Earth Overlimit DMG and increases Poise Break Efficiency against the target by 0.2% per Sigil consumed for 15s. |
| SHOCK | Lightning Sigil | Deals Lightning Overlimit DMG and increases the active character's DEF Penetration by 0.3% per Sigil consumed for 15s. |
| EXPOSURE | Light Sigil | Deals Light Overlimit DMG and additional True DMG equal to 30% of the triggering character's ATK per Sigil consumed. |
| SHATTER | Dark Sigil | Deals Dark Overlimit DMG and decreases the target's Elemental DMG Resistance by 0.4% per Sigil consumed for 15s. |