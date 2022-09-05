const nextElementInList = (list, value) => {
  const currentIndex = list.indexOf(value);
  const nextActionIndex = (currentIndex + 1) % list.length;
  return list[nextActionIndex];
};

export default nextElementInList;
