# PHP client for api.plagtracker.com

Installation
----------------------

```json
{
    "require": {
        "plagtracker/api-client": "0.0.*"
    }
}
```

Usage
----------------------

### Create client
```php
$client = new \Plagtracker\Api\Client('login', 'password');
```
<br>

### Add text for checking
```php
$response = $client->addTextForChecking('text');
if($response->isSuccessfully())
{
    $hash = $response->getData();
}
else
{
    echo 'ERROR: ' . $response->getMessage();
}
```
<br>

### Add url for checking
```php
$response = $client->addUrlForChecking('http://example.com');
$hash = $response->getData();
```
<br>

### Add file for checking
```php
$response = $client->addFileForChecking('/path/to/file');
$hash = $response->getData();
```
<br>

### Get text status
```php
$response = $client->getTextStatus($hash);
if($response->isSuccessfully())
{
    $completedPercent = $response->getData();
}
else
{
    echo 'ERROR: ' . $response->getMessage();
}
```
<br>

### Get result
```php
$response = $client->getResult($hash);
if($response->isSuccessfully())
{
    $result = $response->getData();
}
else
{
    echo 'ERROR: ' . $response->getMessage();
}
```
<br>

### Get plagiarism percent
```php
$response = $client->getPlagiarismPercent($hash);
if($response->isSuccessfully())
{
    $plagiarismPercent = $response->getData();
}
else
{
    echo 'ERROR: ' . $response->getMessage();
}
```
<br>

### Get text
```php
$response = $client->getText($hash);
if($response->isSuccessfully())
{
    $text = $response->getData();
}
else
{
    echo 'ERROR: ' . $response->getMessage();
}
```
<br>
