
```go
cmd := exec.Command("rm", path)
// cmd := exec.Command("pwd")
var out bytes.Buffer
cmd.Stdout = &out
err := cmd.Run()
if err != nil {
  log.Fatal(err)
}
```