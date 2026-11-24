---
title: 'General Damage Formula'
description: 'Document by: Leifa. Thank you very much to 666bj and Mero for assistance figuring out the game’s formulas\!'
---

*This document is very WIP and values will be finalised upon the game’s release!*

## Default DMG Formula

Although DMG is all multiplication, there are three key stages to the DMG formula:

$$
\begin{aligned}
\text{Initial DMG} &= \text{Base DMG} \times \text{DEF Multiplier} \times \text{Elemental DMG} \times \text{Generic DMG} \\
&\quad \times \text{Crit} \times \text{Mastery} \times \text{Hit Location} \times \text{Level Pressure} \\
\end{aligned}
$$

$$
\begin{aligned}
\text{Restraint DMG} &= \max\big(1, \text{Initial DMG} \times \text{Restraint}\big) \\
\end{aligned}
$$

$$
\begin{aligned}
\text{Final DMG} &= \text{RoundEven}\Big(\text{Restrained DMG} \times \text{Global Multiplier} \times \text{Break} \Big) \\
\end{aligned}
$$

For the full DMG Formula as one equation:

$$
\begin{aligned}
\text{Final DMG} &= \text{RoundEven}\Big( \max\big(1, \text{Base DMG} \times \text{DEF Multiplier} \\
&\quad  \times \text{Elemental DMG} \times \text{Generic DMG} \times \text{Crit} \times \text{Mastery} \times \text{Hit Location} \\
&\quad  \times \text{Level Pressure} \times \text{Restraint}\big) \times \text{Global Multiplier} \times \text{Break} \Big) \\
\end{aligned}
$$

## Base DMG and Staged Stat Calculations

### Base DMG

Base DMG handles the attack’s respective Skill Multiplier and the Stat used. The Stat used can either be the caster’s current stat or a snapshotted stat at the time of casting for specific abilities.   
Currently, ATK is the primary Stat utilised by most skills, while Max HP and DEF can be but are less utilised:

$$
\begin{aligned}
\text{Base DMG} &= \text{Stat} \times \text{Skill Multiplier} \\
\end{aligned}
$$

### Staged Stat Calculations

Similarly to the DMG formula, all combat-related stats have three key stages. Stats that currently fall under this system include:  
ATK, Max HP, DEF, Crit Rate, Crit DMG, Overlimit Strength, Poise DMG, Elemental DMG Bonus, DEF Penetration and Energy Recharge.

#### Base Stats

The white stat number seen in a character’s stat page. Base Max HP is Floored before entering Initial Stats, while all other stats retain all decimals.

$$
\begin{aligned}
\text{Character Base Stats} &= \text{Level Base Growth Value} + \text{Ascension Bonus} + \text{Star Gift Bonus} \\
&\quad + \text{Lumen Base Value} + \text{String Tuning Base Stat} \\
\end{aligned}
$$

$$
\begin{aligned}
\text{Kibo Base Stats} &= \text{Level Base Growth Value} \times \text{Nature Multi} \\
&\quad \times \text{Six-Stat Aptitude Multi} + \text{Origin Vein Bonus} \\
\end{aligned}
$$

$$
\begin{aligned}
\text{Kibo Base Crit Rate} &= \text{Base Crit Rate} + \text{Crit Aptitude Bonus} + \text{Origin Vein Bonus} \\
\end{aligned}
$$

#### Initial Stats

The combination of the white and green stat numbers seen in a character’s stat page.These take place outside of combat. The green number shows the difference between Initial and Base Stat values for ATK, HP and DEF, while other stats only show their combined totals. For display, character stats are rounded down but still retain all decimals.   
   
$$
\begin{aligned}
\text{Initial Stats} &= \text{Base Stat} \times \big(1 + \text{Initial Stat\%}\big) + \text{Flat Initial Stat} \\
\end{aligned}
$$

Initial Percent Stats include Lumen % substats, equipment main and secondary % stats (e.g. ATK%, HP%, DEF%), High-Rank Ascension ATK%, Tuning % buffs, “Kibo Factor Chain” and “Shining Aptitude buffs”.  
Flat Initial Stats include equipment flat stats (e.g. Flat ATK, Flat HP, Flat DEF) and character Affinity bonuses. 

Kibos also inherit a percentage of a character’s Initial ATK, Max HP and DEF based on their Bond Level. These values are rounded down and added to their Flat Initial Stats. 

Some specific skills and DoT effects do not check the attacker’s current Combat Stat and instead utilise their Initial Stats, resulting in Combat Buffs and Debuffs not affecting their DMG output.

#### Combat Stats

Upon entering combat, In Combat buffs, auras (such as Elemental Tuning Marks), equipment skill passives and debuffs take place on top of the Initial Stats dynamically. 

$$
\begin{aligned}
\text{Combat Stats} &= \Big(\big(\text{Initial Stat} + \text{Combat Base Changes}\big) \\
&\quad \times \big(1 + \text{Combat Stat\%}\big) + \text{Flat Combat Stat}\Big) \\
&\quad \times \text{Global Scaling Coefficient} \\
\end{aligned}
$$


Some effects grant a “Forced Numerical Override”, replacing any stat calculated in the Combat Stat step before multiplying by the Global Scaling Coefficient.

Stats such as DMG Bonuses and Crit Rate that are always displayed as percentages are stored as decimals and fall into the Flat Stat category. 

## DEF Multiplier

$$
\begin{aligned}
\text{DEF Multiplier} &= \frac{\text{ALC}}{\text{ALC} + \text{Effective DEF}} \\
\end{aligned}
$$

### Attacker Level Coefficient

The Attacker Level Coefficient (shortened to ALC) is determined based on the attacker’s level and increases linearly:

$$
\begin{aligned}
\text{ALC} &= 500 + 5 \times \text{Attacker Level} \\
\end{aligned}
$$

### Effective DEF

Flat sources of DEF PEN take place before DEF PEN%. Effective DEF can not go below 0\.

$$
\begin{aligned}
\text{Effective DEF} &= \max\Big(0,\; (\text{Target's Combat DEF} - \text{Flat DEF Penetration}) \\
&\quad \times (1 - \text{DEF Penetration\%})\Big) \\
\end{aligned}
$$

### Enemy Base DEF

$$
\begin{aligned}
\text{Enemy Base DEF} &= \big(500 + (5 \times \text{Enemy Level})\big) \times \text{Enemy DEF Coefficient} \\
\end{aligned}
$$

#### Enemy DEF Coefficient

Currently, enemy DEF changes based on their DEF Coefficient. This varies between all enemies but current measurements of DEF Coefficients is:

- Bosses: 0.10× \- 1.25×  
- Elites: 0.78× \- 1.14×   
- Common Enemies: 0.60× \- 1.10×

## Elemental DMG Multiplier

The Elemental DMG Multiplier includes both Elemental DMG Bonuses and Elemental DMG Resistance stats. Currently, 11 different Elemental types exist: Fire, Wind, Earth, Wood, Ice, Water, Lightning, Light, Dark, Physical and “All Elements”. Effects that specify an Element such as “Fire DMG \+X%” or “Enemy Fire Resistance \+X%” are found here.

$$
\begin{aligned}
\text{Elemental DMG} &= 1 + \text{Elemental DMG Bonus} - \text{Elemental DMG Resistance} \\
\end{aligned}
$$

## Generic DMG Multiplier

Generic DMG Bonus and DMG Reduction sources are a separate multiplier to Elemental DMG and include all DMG Increase / Reduction effects that do not specify an Element. Specific Skill DMG Bonuses also fall under this category, with no separate multiplier for specifically “Basic Attack DMG Increased” or “Starcall Art DMG Increased”. 

$$
\begin{aligned}
\text{Generic DMG} &= 1 + \text{DMG Bonus} - \text{DMG Reduction} \\
\end{aligned}
$$

## Crit Multiplier

When a Critical hit occurs, the game multiplies DMG by the displayed Crit DMG value, rather than adding 1 to the initial multiplier:

$$
\begin{aligned}
\text{Crit Multiplier} &= \text{Combat Crit DMG} - \text{Combat Crit Dmg Reduction} \\
\end{aligned}
$$

$$
\begin{aligned}
\text{Effective Crit Multiplier} &= 1 + \text{Effective Crit Rate} \times (\text{Crit Multiplier} - 1) \\
\end{aligned}
$$

### Crit Rate

To determine if an attack results in a Critical Hit, the game rolls a random number between 0 and 1\. IF this number is less than the attack’s Effective Crit Rate, the resulting hit is a Critical Hit.

$$
\begin{aligned}
\text{Effective Crit Rate} &= \min\Big(1,\; \max(0,\; \text{Combat Crit Rate} \\
&\quad - \text{Combat Crit Rate Resistance})\Big) \\
\end{aligned}
$$

## Mastery Multiplier

Also called Overlimit Strength, but now affects all DMG as of the release version. Normal DMG utilises a different Mastery Coefficient to Overlimit DMG. For Overlimit DMG mechanics, please see the Overlimit DMG document.

$$
\begin{aligned}
\text{Mastery Multiplier} &= 1 + \frac{\text{Overlimit Strength}}{4000} \\
\end{aligned}
$$


## Hit Location Multiplier

Large enemies are made up of multiple hitboxes, with different parts of their body having a unique DMG Multiplier. This differs depending on the enemy. Some take 1.1× DMG hitting their weak point and 0.9× DMG hitting armored areas. By default this multiplier is 1.0×.

$$
\begin{aligned}
\text{Hit Location} &= 0.9 \sim 1.1 \text{ depending on Body Part} \\
\end{aligned}
$$


## Level Pressure Multiplier

Level Pressure reduces the DMG and Poise DMG dealt by an attacker based on the difference between the attacker and the target’s levels. This multiplier can not go beyond 1, serving only to reduce DMG if the attacker is notably lower level than a target.

$$
\begin{aligned}
\text{Level Pressure} = 0.96^{\max(0,\; \text{Target Level} - \text{Attacker Level})} \\
\end{aligned}
$$

Level Pressure only affects DMG in areas such as the open world. In Domains and challenge stages such as Endgame combat, commissions and co-op instances, Level Pressure is disabled for normal DMG. On the other hand, Poise DMG Level Pressure is always enabled in these instances. Only specific Counter Skills from characters are exempt from Poise DMG Level Pressure.

## Restraint Multiplier

Some Elements are stronger or weaker against each other, increasing or decreasing the Restraint Multiplier by 25% based on the Elemental matchup. Targets can have multiple Elements, resulting in double Advantages, double Disadvantages or neutral DMG if one Element’s Advantage cancels out the other’s Disadvantage. Non-Elemental DMG has no Advantage or Disadvantage to any other Element. 

$$
\begin{aligned}
\text{Restraint} &= 1 + 0.25 \times (\text{Number of Elemental Advantages} \\
&\quad - \text{Number of Elemental Disadvantages}) \\
\end{aligned}
$$

## Break Multiplier

Elite and Boss enemies have a Poise meter that, once depleted to zero, causes the enemy to become Broken for a period of time. During this time, the Break Multiplier is active:

$$
\begin{aligned}
\text{Break} &= (1 + \text{Break Vulnerability}) \\
&\quad \times (1 + \text{Direct Break Vulnerability}) \\\\
\end{aligned}
$$

By default, an enemy has \+100% Break Vulnerability when Broken. Break Vulnerability and Direct Break Vulnerability are part of this Multiplier but are multiplicative with each other. Overlimit DMG currently is only affected by Break Vulnerability and not by Direct Break Vulnerability.

## Global Multiplier

An additional multiplier used for special effects. Exists but appears to be rarely used.

$$
\begin{aligned}
\text{Global Multiplier} &= 1 + \text{Global Bonus\%}\\
\end{aligned}
$$

## Special DMG Formulas

### Damage over Time Formula

DoT effects typically can not trigger a Critical Hit unless “Can Crit” is set to true. Most default Elemental DoTs can not Crit, while enhanced DoTs from specific character effects can Crit. They additionally do not benefit from modifiers part of the Final DMG stage of the DMG Formula, nor do they benefit from Hit Location. 
*Note: This formula will need double checking again in case*

$$
\begin{aligned}
\text{DoT DMG} &= \text{RoundEven}\Big( \max\big(1, \text{Base DMG} \times \text{DEF Multi} \\
&\quad \times \text{Elemental DMG} \times \text{Generic DMG} \times \text{Mastery} \\
&\quad \times \text{Level Pressure}\big) \times \text{Restraint} \Big) \\
\end{aligned}
$$

### True DMG Formula

True DMG ignores all multipliers that affect Initial DMG and Restraint DMG, aside from the Mastery Multiplier and Hit Location Multiplier, giving the following formula:

$$
\begin{aligned}
\text{True DMG} &= \text{RoundEven}\Big( \max\big(1, \text{Base DMG} \times \text{Mastery} \\
&\quad  \times \text{Hit Location}\big) \times \text{Break} \times \text{Global Multi} \Big) \\
\end{aligned}
$$

True DMG additionally ignores any Shields the target currently has, directly reducing their Current HP. Currently, True DMG is non-lethal and will not reduce a Target’s Current HP lower than 1\.

### Healing Formula

$$
\begin{aligned}
\text{Final Healing} &= \text{RoundEven}\Big( \text{Base Healing} \times (1 + \text{Healing Bonus\%} \\
&\quad + \text{Incoming Healing Bonus\%}) \times \text{Global Multi} \Big) \\ 
\end{aligned}
$$

#### Base Healing

Currently, the Stats used for Healing can be one of ATK, Max HP or DEF:  

$$
\begin{aligned}
\text{Base Healing} &= \text{Stat} \times \text{Skill Healing Multiplier} \\
\end{aligned}
$$

### Shield Generation Formula

$$
\begin{aligned}
\text{Shield Generation} &= \text{Stat} \times \text{Shield Multiplier} \times (1 + \text{Shield Effectiveness}) \\
\end{aligned}
$$

### Lifesteal Formula

Lifesteal uses the final amount of DMG dealt to the target’s HP gauge as an Integer after any reduction from Shields:

$$
\begin{aligned}
\text{Lifesteal} &= \text{Final HP DMG Dealt} \times \text{Lifesteal Skill Multiplier} \\
\end{aligned}
$$

### DMG Reflection Formula

DMG Reflection uses the full DMG taken by the target as its input, regardless of if dealt to Shields or HP:

$$
\begin{aligned}
\text{Lifesteal} &= \text{Total Final DMG Dealt} \times \text{Reflection Skill Multiplier} \\
\end{aligned}
$$

