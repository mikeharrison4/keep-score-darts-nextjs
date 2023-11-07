const multipliersWithPrefixes = [
  { multiplier: 1, prefix: '' },
  { multiplier: 2, prefix: 'D' },
  { multiplier: 3, prefix: 'T' },
];

const darts = [
  20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 50, 25,
];

const doubles = darts
  .filter((dart) => dart !== 50 && dart !== 25)
  .map((d) => d * 2);

function isBullseye(dart: number | string) {
  return dart === '50' || dart === 50;
}

function isDartAFinalFinisher(dart: string) {
  return dart.startsWith('D') || isBullseye(dart);
}

function findFinishers(
  finishers: Array<Array<string>>,
  remainingScore: number,
  throwsLeft: number,
  dartsUsed: Array<string>
) {
  // finish with just one dart throw, this will always only be caught in the initial loop
  if (remainingScore === 0 && isDartAFinalFinisher(dartsUsed[0])) {
    finishers.push(dartsUsed);
    return;
  }

  // finish with bullseye
  if (isBullseye(remainingScore)) {
    const finishingDarts = [...dartsUsed, `D${remainingScore / 2}`];
    if (finishingDarts.length > throwsLeft) return;

    finishers.push([...dartsUsed, `${remainingScore}`]);
    return;
  }

  // finish with double
  if (doubles.includes(remainingScore)) {
    const finishingDarts = [...dartsUsed, `D${remainingScore / 2}`];
    if (finishingDarts.length > throwsLeft) return;

    finishers.push(finishingDarts);
    return;
  }

  for (const dart of darts) {
    multipliersWithPrefixes.forEach(({ multiplier, prefix }) => {
      const nextRemainingScore = remainingScore - dart * multiplier;

      // do not multiply when dart is bullseye or 25
      if ([2, 3].includes(multiplier) && (isBullseye(dart) || dart === 25)) {
        return;
      }

      // only recursively loop through it again if there is definitely a finishing dart that is a double or a bullseye, if not, then fallback to initial loop
      if (doubles.includes(nextRemainingScore) || nextRemainingScore === 50) {
        findFinishers(finishers, nextRemainingScore, throwsLeft, [
          ...dartsUsed,
          `${prefix}${dart}`,
        ]);
      }
    });
  }
}

export function generateFinishers(
  remainingScore: number,
  throwsLeft: number
): Array<Array<string>> {
  const finishers: Array<Array<string>> = [];

  // initial loop
  for (const dart of darts) {
    multipliersWithPrefixes.forEach(({ multiplier, prefix }) => {
      const nextRemainingScore = remainingScore - dart * multiplier;

      // do not multiply when dart is bullseye or 25
      if ([2, 3].includes(multiplier) && (isBullseye(dart) || dart === 25)) {
        return;
      }

      findFinishers(finishers, nextRemainingScore, throwsLeft, [
        `${prefix}${dart}`,
      ]);
    });
  }

  return finishers;
}
