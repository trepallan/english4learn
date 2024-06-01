async function markAsDone(req: any, res: any) {
  const { id } = req.params;
  const { percentage } = req.body;

  console.log(percentage, id);
}

export default markAsDone;
