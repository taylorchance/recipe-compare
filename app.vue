<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
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
</style>