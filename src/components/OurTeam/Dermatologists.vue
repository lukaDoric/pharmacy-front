<template>
  <b-jumbotron class="jumbotron">
    <h1 class="display-4">Dermatologists</h1>

    <div class="container my-4">
      <hr>
      <div class="table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
          </tr>
          </thead>
          <tbody>
          <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1"
              href="#collapseOne">
            <td class="expand-button"></td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>

          </tr>
          <tr class="hide-table-padding">
            <td></td>
            <td colspan="3">
              <div id="collapseOne" class="collapse in p-3">
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 1</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 2</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 3</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 4</div>
                </div>
              </div>
            </td>
          </tr>
          <tr class="accordion-toggle collapsed" id="accordion2" data-toggle="collapse" data-parent="#accordion2"
              href="#collapseTwo">
            <td class="expand-button"></td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>

          </tr>
          <tr class="hide-table-padding">
            <td></td>
            <td colspan="4">
              <div id="collapseTwo" class="collapse in p-3">
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value</div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </b-jumbotron>
</template>

<script>
export default {
  name: "Dermatologists"
}
</script>

<style>
.jumbotron {
  border-radius: 5em !important;
  margin-right: 5em;
  margin-left: 5em;
  margin-top: 5em;
}

.display-4 {
  margin-bottom: 0.5em;
}

tr.hide-table-padding td {
  padding: 0;
}

.expand-button {
  position: relative;
}

.accordion-toggle .expand-button:after {
  position: absolute;
  left: .75rem;
  top: 50%;
  transform: translate(0, -50%);
  content: '-';
}

.accordion-toggle.collapsed .expand-button:after {
  content: '+';
}
</style>