export default (): HTMLElement => {
  const root = document.createElement('div');

  document.body.appendChild(root);

  return root;
};
