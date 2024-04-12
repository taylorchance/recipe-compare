<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.loader-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.loader {
  width: 4em;
  height: 4em;
  border-width: 4px;
  border-left-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
}

p.ingredient {
  padding: .75rem 0;
}

p.ingredient + p.ingredient {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.quantity, .unit {
  font-weight: 600;
  margin-right: 4px;
}

span.ingredient span {
  color: rgb(22, 70, 48);
  background-color: rgb(239, 250, 245);
  padding: 2px 3px;
}

.field {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: .5rem;
  white-space: nowrap;
  touch-action: manipulation;
}

.field .button {
  color: #000000;
  background: none;
  box-shadow: none;
  border: 0;
  height: 100%;
  width: 40px;
  padding: 0;
  max-height: 40px;
  cursor: pointer;
}
</style>