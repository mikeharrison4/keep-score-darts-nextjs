const multipliersWithPrefixes = [
  { multiplier: 3, prefix: 'T' },
  { multiplier: 2, prefix: 'D' },
  { multiplier: 1, prefix: '' },
];

const darts = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50,
].reverse();

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
  dartsUsed: Array<string>
) {
  // finish with just one dart throw
  if (remainingScore === 0 && isDartAFinalFinisher(dartsUsed[0])) {
    finishers.push(dartsUsed);
    return;
  }

  // finish with bullseye
  if (isBullseye(remainingScore)) {
    finishers.push([...dartsUsed, `${remainingScore}`]);
    return;
  }

  // finish with double
  if (doubles.includes(remainingScore)) {
    finishers.push([...dartsUsed, `D${remainingScore / 2}`]);
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
        findFinishers(finishers, nextRemainingScore, [
          ...dartsUsed,
          `${prefix}${dart}`,
        ]);
      }
    });
  }
}

export function generateFinishers(
  remainingScore: number
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

      findFinishers(finishers, nextRemainingScore, [`${prefix}${dart}`]);
    });
  }

  return finishers;
}
