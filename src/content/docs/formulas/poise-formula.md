---
title: 'Break System and Poise Formulas'
description: 'Document by: Leifa. Thank you very much to 666bj and Mero for assistance figuring out the game’s formulas\!'
---

*This document is very WIP and values will be finalised upon the game’s release!*

Elite and Boss enemies have a Poise Meter that, once fully depleted, causes them to enter a Broken state. Currently, enemy Poise Meters do not appear to scale with level but do increase when playing Co-Op missions. Although there are some exceptions, almost all enemies have the current Poise Meter values:

- Bosses: 12.000 Poise
- Elites: 9,600 Poise
## Poise DMG Formula
Poise DMG is technically clamped between an enemy's Min Poise and Max Poise stats. However, many enemies seem to not use this system so it has currently been ignored.

$$
\begin{aligned}
\text{Poise DMG} &= \text{RoundEven}\big(\text{Break Value} \times \text{Poise Skill Multiplier}  \\
&\quad  \times \text{Break Efficiency} \times \text{Poise RES} \\
&\quad \times \text{Elemental Poise RES} \times \text{Level Pressure}\big) \\
\end{aligned}
$$

## Poise Skill Multiplier
All skills have specific Poise Skill Multipliers that are not shown to the player. Please check wikis to find a character's Poise Multipliers for calculations. 

## Break Efficiency Multiplier
Break Efficiency is the Poise equivalent of DMG Bonus stats, increasing Poise dealt by a certain amount. This includes general Poise Break Efficiency and Skill-specific Break Efficiency effects.

$$
\begin{aligned}
\text{Break Efficiency Multiplier} &=(1 + \text{Break Efficiency\%}  \\
\end{aligned}
$$

## Poise RES and Elemental Poise RES
Enemies each have a universal Poise RES and specific Elemental Poise RES stats for each Element. These two stats are multiplicative with each other and are separate to the Restraint Multiplier found on Normal DMG. Currently, any enemy I have encountered has both of these values at 1.0.

## Level Pressure Multiplier

Level Pressure reduces the DMG and Poise DMG dealt by an attacker based on the difference between the attacker and the target’s levels. This multiplier can not go beyond 1, serving only to reduce DMG if the attacker is notably lower level than a target.

$$
\begin{aligned}
\text{Level Pressure} = 0.96^{\max(0,\; \text{Target Level} - \text{Attacker Level})} \\
\end{aligned}
$$

Level Pressure only affects DMG in areas such as the open world. In Domains and challenge stages such as Endgame combat, commissions and co-op instances, Level Pressure is disabled for normal DMG. On the other hand, Poise DMG Level Pressure is always enabled in these instances. Only specific Counter Skills from characters are exempt from Poise DMG Level Pressure.