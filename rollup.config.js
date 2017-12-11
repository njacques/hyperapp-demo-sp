import buble from "rollup-plugin-buble"
import resolve from "rollup-plugin-node-resolve"
import uglify from "rollup-plugin-uglify"

export default {
  plugins: [
    buble({
      jsx: "h",
      objectAssign: "Object.assign"
    }),
    resolve({
      jsnext: true
    }),
    uglify()
  ]
}