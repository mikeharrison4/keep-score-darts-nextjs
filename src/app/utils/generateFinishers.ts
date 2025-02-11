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

function loopDarts(
  finishers: Array<Array<string>>,
  isInitialLoop: boolean,
  remainingScore: number,
  throwsLeft: number,
  dartsUsed: Array<string> = []
) {
  for (const dart of darts) {
    multipliersWithPrefixes.forEach(({ multiplier, prefix }) => {
      // do not multiply when dart is bullseye or 25
      if ([2, 3].includes(multiplier) && (isBullseye(dart) || dart === 25)) {
        return;
      }

      const nextRemainingScore = remainingScore - dart * multiplier;
      const nextDart = `${prefix}${dart}`;

      if (isInitialLoop) {
        findFinishers(finishers, nextRemainingScore, throwsLeft, [nextDart]);
      } else if (
        doubles.includes(nextRemainingScore) ||
        isBullseye(nextRemainingScore)
      ) {
        findFinishers(finishers, nextRemainingScore, throwsLeft, [
          ...dartsUsed,
          nextDart,
        ]);
      }
    });
  }
}

function findFinishers(
  finishers: Array<Array<string>>,
  remainingScore: number,
  throwsLeft: number,
  dartsUsed: Array<string>
) {
  // finish with just one dart throw
  if (remainingScore === 0 && isDartAFinalFinisher(dartsUsed[0])) {
    finishers.push(dartsUsed);
    return;
  }

  // finish with bullseye
  if (isBullseye(remainingScore)) {
    const finishingDarts = [...dartsUsed];
    if (finishingDarts.length > throwsLeft) return;

    finishers.push([...finishingDarts, `${remainingScore}`]);
    return;
  }

  // finish with double
  if (doubles.includes(remainingScore)) {
    const finishingDarts = [...dartsUsed, `D${remainingScore / 2}`];
    if (finishingDarts.length > throwsLeft) return;

    finishers.push(finishingDarts);
    return;
  }

  loopDarts(finishers, false, remainingScore, throwsLeft, dartsUsed);
}

export function generateFinishers(
  remainingScore: number,
  throwsLeft: number
): Array<Array<string>> {
  const finishers: Array<Array<string>> = [];

  // initial loop
  loopDarts(finishers, true, remainingScore, throwsLeft);

  return finishers;
}
