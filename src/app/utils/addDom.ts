export default (id: string): HTMLElement => {
  const root = document.createElement('div');

  root.id = id;

  document.body.appendChild(root);

  return root;
};
