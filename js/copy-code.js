document.querySelectorAll('pre > code').forEach((codeBlock) => {
  // 创建复制按钮
  const button = document.createElement('button');
  button.className = 'copy-code-button btn btn-sm btn-outline-secondary';
  button.type = 'button';
  button.innerText = 'Copy';
  
  // 让 pre 元素相对定位
  codeBlock.parentNode.style.position = 'relative';
  
  button.style.position = 'absolute';
  button.style.top = '6px';
  button.style.right = '10px';
  codeBlock.parentNode.appendChild(button);

  button.addEventListener('click', () => {
    // 用 textContent 获取真实代码，并消除两行一换行的问题
    let code = codeBlock.textContent.replace(/\r/g, '').replace(/\n{2,}/g, '\n').trim();
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = 'Copied!';
      setTimeout(() => {
        button.innerText = 'Copy';
      }, 2000);
    });
  });
});