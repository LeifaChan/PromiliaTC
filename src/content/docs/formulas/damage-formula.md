---
title: 'General Damage Formula'
description: 'Document by: Leifa. Thank you very much to 666bj and Mero for assistance figuring out the game’s formulas\!'
---

*This document is very WIP and values will be finalised upon the game’s release!*

## Default DMG Formula

Although DMG is all multiplication, there are three key stages to the DMG formula:

Initial DMG \= Base DMG × DEF Multi × Elemental DMG Multi × Generic DMG Multi × Crit Multi × Mastery Multi × Hit Location Multi × Level Pressure Multi

Restraint DMG \= max(1, Initial DMG × Restraint Multi)

Final DMG \= RoundEven(Restraint DMG × Global Multi × Break Multi)

For the full DMG Formula as one equation:

$$
\begin{aligned}
\text{Final DMG} = \text{RoundEven}\Big( \max\big(1,\; &\text{Base DMG} \times \text{DEF Multi} \times \text{Elemental DMG Multi} \\
&\times \text{Generic DMG Multi} \times \text{Crit Multi} \times \text{Mastery Multi} \\
&\times \text{Hit Location Multi} \times \text{Level Pressure Multi} \times \text{Restraint Multi}\big) \\
&\times \text{Global Multi} \times \text{Break Multi} \Big)
\end{aligned}
$$

## Base DMG and Staged Stat Calculations

### Base DMG

Base DMG handles the attack’s respective Skill Multiplier and the Stat used. The Stat used can either be the caster’s current stat or a snapshotted stat at the time of casting for specific abilities.   
Currently, ATK is the primary Stat utilised by most skills, while Max HP and DEF can be but are less utilised:

Base DMG \= Stat × Skill Multiplier

### Staged Stat Calculations

Similarly to the DMG formula, all combat-related stats have three key stages. Stats that currently fall under this system include:  
ATK, Max HP, DEF, CRIT Rate, CRIT DMG, Overlimit Strength, Poise DMG, Elemental DMG Bonus, DEF Penetration and Energy Recharge.

#### Base Stats

The white stat number seen in a character’s stat page. Base Max HP is Floored before entering Initial Stats, while all other stats retain all decimals.

Character Base Stats \= Level Base Growth Value \+ Ascension Bonus \+ Star Gift Bonus \+ Lumen Base Value \+ String Tuning Base Stat

Kibo Base Stats \= (Level Base Growth Value × Nature Multiplier × Six-Stat Aptitude Multiplier) \+ Origin Vein Bonus

Kibo Base CRIT Rate \= Base Crit Rate \+ Crit Aptitude Bonus \+ Origin Vein Bonus

#### Initial Stats

The combination of the white and green stat numbers seen in a character’s stat page.These take place outside of combat. The green number shows the difference between Initial and Base Stat values for ATK, HP and DEF, while other stats only show their combined totals. For display, character stats are rounded down but still retain all decimals.   
   
Initial Stats \= Base Stat × (1 \+ Initial Stat%) \+ Flat Initial Stat

Initial Percent Stats include Lumen % substats, equipment main and secondary % stats (e.g. ATK%, HP%, DEF%), High-Rank Ascension ATK%, Tuning % buffs, “Kibo Factor Chain” and “Shining Aptitude buffs”.  
Flat Initial Stats include equipment flat stats (e.g. Flat ATK, Flat HP, Flat DEF) and character Affinity bonuses. 

Kibos also inherit a percentage of a character’s Initial ATK, Max HP and DEF based on their Bond Level. These values are rounded down and added to their Flat Initial Stats. 

Some specific skills and DoT effects do not check the attacker’s current Combat Stat and instead utilise their Initial Stats, resulting in Combat Buffs and Debuffs not affecting their DMG output.

#### Combat Stats

Upon entering combat, In Combat buffs, auras (such as Elemental Tuning Marks), equipment skill passives and debuffs take place on top of the Initial Stats dynamically. 

Combat Stats \= ((Initial Stat \+ In Combat Base Changes) × (1 \+ Combat Stat%) \+ Flat Combat Stat) × Global Scaling Coefficient

Some effects grant a “Forced Numerical Override”, replacing any stat calculated in the Combat Stat step before multiplying by the Global Scaling Coefficient.

Stats such as DMG Bonuses and CRIT Rate that are always displayed as percentages are stored as decimals and fall into the Flat Stat category. 

## DEF Multiplier

DEF Multiplier \= ALC / (ALC \+ Effective DEF)

### Attacker Level Coefficient

The Attacker Level Coefficient (referred to as ALC) is determined based on the attacker’s level and increases linearly:

ALC \= 500 \+ 5 × Attacker Level

### Effective DEF

Flat sources of DEF PEN take place before DEF PEN%. Effective DEF can not go below 0\.

Effective DEF \= max(0, Target’s Combat DEF \- Attacker’s Flat DEF Penetration) × (1 \- Attacker’s DEF Penetration%))

### Enemy Base DEF

Enemy Base DEF \= (500 \+ (5 × Enemy Level) × Enemy DEF Coefficient

#### Enemy DEF Coefficient

Currently, enemy DEF changes based on their DEF Coefficient. This varies between all enemies but current measurements of DEF Coefficients is:

- Bosses: 0.10× \- 1.25×  
- Elites: 0.78× \- 1.14×   
- Common Enemies: 0.60× \- 1.10×

## Elemental DMG Multiplier

The Elemental DMG Multiplier includes both Elemental DMG Bonuses and Elemental DMG Resistance stats. Currently, 11 different Elemental types exist: Fire, Wind, Earth, Wood, Ice, Water, Lightning, Light, Dark, Physical and “All Elements”. Effects that specify an Element such as “Fire DMG \+X%” or “Enemy Fire Resistance \+X%” are found here.

Elemental DMG Multiplier \= 1 \+ Elemental DMG Bonus \- Elemental DMG Resistance

## Generic DMG Multiplier

Generic DMG Bonus and DMG Reduction sources are a separate multiplier to Elemental DMG and include all DMG Increase / Reduction effects that do not specify an Element. Specific Skill DMG Bonuses also fall under this category, with no separate multiplier for specifically “Basic Attack DMG Increased” or “Starcall Art DMG Increased”. 

Generic DMG Multiplier \= 1 \+ DMG Bonus \- DMG Reduction

## Crit Multiplier

When a critical hit occurs, the game multiplies DMG by the displayed CRIT DMG value, rather than adding 1 to the initial multiplier:

CRIT Multiplier \= Combat CRIT DMG \- Combat CRIT DMG Reduction

Effective CRIT Multiplier \= 1 \+ Effective CRIT Rate × (CRIT Multiplier \- 1\)

### CRIT Rate

To determine if an attack results in a Critical Hit, the game rolls a random number between 0 and 1\. IF this number is less than the attack’s Effective CRIT Rate, the resulting hit is a Critical Hit.

Effective CRIT Rate \= min(1, max(0, Combat CRIT Rate \- Combat CRIT Rate Resistance)

## Mastery Multiplier

Also called Overlimit Strength, but now affects all DMG as of the release version. Normal DMG utilises a different Mastery Coefficient to Overlimit DMG. For Overlimit DMG mechanics, please see the Overlimit DMG document.

Mastery Multiplier \= 1 \+ Overlimit Strength / 4000

## Hit Location Multiplier

Large enemies are made up of multiple hitboxes, with different parts of their body having a unique DMG Multiplier. This differs depending on enemies but some enemies take 1.1× DMG hitting their weak point and 0.9× DMG hitting armored areas. By default this multiplier is 1.0×.

Hit Location Multiplier \= 0.9× \- 1.1× depending on Body Part.

## Level Pressure Multiplier

Level Pressure reduces the DMG and Poise DMG dealt by an attacker based on the difference between the attacker and the target’s levels. This multiplier can not go beyond 1, serving only to reduce DMG if the attacker is notably lower level than a target.

Level Pressure Multiplier \= 0.96 ^ (max(0, Target Level \- Attacker Level)

Level Pressure only affects DMG in areas such as the open world. In Domains and challenge stages such as Endgame combat, commissions and co-op instances, Level Pressure is disabled for normal DMG. On the other hand, Poise DMG Level Pressure is always enabled in these instances. Only specific Counter Skills from characters are exempt from Poise DMG Level Pressure.

## Restraint Multiplier

Some Elements are stronger or weaker against each other, increasing or decreasing the Restraint Multiplier by 25% based on the Elemental matchup. Targets can have multiple Elements, resulting in double Advantages, double Disadvantages or neutral DMG if one Element’s Advantage cancels out the other’s Disadvantage. Non-Elemental DMG has no Advantage or Disadvantage to any other Element. 

Restraint Multiplier \= 1 \+ 0.25 × (Number of Elemental Advantages \- Number of Elemental Disadvantages)

## Break Multiplier

Elite and Boss enemies have a Poise meter that, once depleted to zero, causes the enemy to become Broken for a period of time. During this time, the Break Multiplier is active:

Break Multiplier \= (1 \+ Break Vulnerability) × (1 \+ Break Direct DMG Vulnerability)

By default, an enemy has \+100% Break Vulnerability when Broken. Break Vulnerability and Break Direct DMG Vulnerability are part of this Multiplier but are multiplicative with each other. Overlimit DMG currently is only affected by Break Vulnerability and not by Break Direct DMG Vulnerability.

## Global Multiplier

An additional multiplier used for special effects. Exists but appears to be rarely used.

Global Multiplier \= 1 \+ Global Bonus%

## Special DMG Formulas

### Damage over Time Formula

DoT effects typically can not trigger a Critical Hit unless “Can Crit” is set to true. Most default Elemental DoTs can not Crit, while enhanced DoTs from specific character effects can Crit. They additionally do not benefit from modifiers part of the Final DMG stage of the DMG Formula, nor do they benefit from Hit Location. 

DoT DMG \= RoundEven(max(1, Base DMG × DEF Multi × Elemental DMG Multi × Generic DMG Multi × Mastery Multi × Level Pressure Multi) × Restraint Multi)

### True DMG Formula

True DMG ignores all multipliers that affect Initial DMG and Restraint DMG, aside from the Mastery Multiplier and Hit Location Multiplier, giving the following formula:

True DMG \= RoundEven(max(1, Base DMG  × Mastery Multi × Hit Location Multi) × Break Multi × Global Multi)

True DMG additionally ignores any Shields the target currently has, directly reducing their Current HP. Currently, True DMG is non-lethal and will not reduce a Target’s Current HP lower than 1\.

### Healing Formula

Final Healing \= RoundEven(Base Healing × (1 \+ Healing Bonus% \+ Incoming Healing Bonus) × Global Multi)

#### Base Healing

Currently, the Stats used for Healing can be one of ATK, Max HP or DEF:  
Base Healing \= Stat × Skill Healing Multiplier

### Shield Generation Formula

Shield Generation \= Base Stat × Shield Multiplier × (1 \+ Shield Effectiveness Bonus)

### Lifesteal and DMG Reflection Formulas

Lifesteal uses the final amount of DMG dealt to the target’s HP gauge as an Integer after any reduction from Shields:

Lifesteal Healing \= Final HP DMG Dealt × Lifesteal Skill Multiplier

DMG Reflection on the other hand uses the full DMG taken by the target as its input:

DMG Reflection \= Total Final DMG Dealt × Reflection Skill Multiplier

