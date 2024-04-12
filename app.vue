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
  font-style: italic;
  color: green;
}
</style>