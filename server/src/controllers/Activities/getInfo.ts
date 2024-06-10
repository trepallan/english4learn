import CompletedThemes from "../../../models/CompletedThemes";

async function getInfo(req: any, res: any) {
  const { type, id, theme_count } = req.params;

  try {
    const themesScore = await CompletedThemes.find({
      user: req.user._id,
      [type]: id,
    });

    let Classe: any;
    // if (themesScore.length === 0) continue;
    if (themesScore.length > 0) {
      let donePercentage: number;

      if (type === "theme") {
        const themes = themesScore.map((theme: any) => theme.theme.toString());
        donePercentage = themes.includes(id) ? 100 : 0;
      } else {
        donePercentage = Math.round((themesScore.length / theme_count) * 100);
      }

      let scoreNotNull = themesScore
        .filter((theme: any) => theme.score !== null)
        .map((theme: any) => theme.score);
      let total = scoreNotNull.reduce((a: any, b: any) => a + b, 0);
      const average = Math.round(total / scoreNotNull.length);

      Classe = {
        done: donePercentage,
        score: average,
      };
    } else {
      Classe = {
        done: 0,
        score: null,
      };
    }

    return res.status(200).send({ data: Classe });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default getInfo;
