const generateName = () => {
  const name = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
  return name;
};

export default generateName;
